import React, { useEffect, useState } from 'react';
import { firestore, collection, addDoc, query, onSnapshot, orderBy } from '../googleSignin/config';
import CommentInput from './CommentInput';
import CustomInput from './CustomInput';

const CommentList = ({ user, googleSignin }) => {
    const [input, setInput] = useState("");
    const [comments, setComments] = useState([]);

    // Fetch all comments
    useEffect(() => {
        const q = query(collection(firestore, 'comments'), orderBy('createdAt', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const commentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setComments(commentsData);
        });

        return () => unsubscribe();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setInput(e.target.value);
        console.log(e.target.value)
    };

    // Add a new comment
    const handleNewComment = async () => {
        if (!input.trim()) return;
        if (!user) {
            googleSignin()
            alert("Please sign in with google")
        }
        try {
            await addDoc(collection(firestore, 'comments'), {
                text: input,
                createdAt: new Date(),
                userId: user.uid,
                parentId: null,
                userName: user.displayName,
                photoURL: user?.photoURL
            });
            setInput("");
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    // Respond to a comment
    const addReply = async (parentId, text) => {
        if (!text.trim()) return;
        if (!user) {
            googleSignin()
            alert("Please sign in with google")
        }
        try {
            await addDoc(collection(firestore, 'comments'), {
                text,
                createdAt: new Date(),
                userId: user.uid,
                parentId,
                userName: user.displayName,
                photoURL: user?.photoURL
            });
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };

    // Recursively build a tree of comments
    const buildCommentTree = (comments, parentId = null) => {
        return comments
            .filter(comment => comment.parentId === parentId)
            .map(comment => ({
                ...comment,
                children: buildCommentTree(comments, comment.id)
            }));
    };

    const commentTree = buildCommentTree(comments);

    return (
        <div>
            <h3>Comments system</h3>
            <div>
                <CustomInput value={input} handleChange={handleChange} handleSave={handleNewComment} />
            </div>
            <div>
                {commentTree.map(comment => (
                    <CommentInput
                        key={comment.id}
                        comment={comment}
                        addReply={addReply}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentList;
