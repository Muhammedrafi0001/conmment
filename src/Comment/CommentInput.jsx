
import React, { useState } from 'react';
import CustomInput from './CustomInput';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data'
import { Emoji_img } from '../googleSignin/GoogleLogo';

const CommentInput = ({ comment, addReply }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [replyInput, setReplyInput] = useState("");
    const [isEmoji, setIsEmoji] = useState(false)

    // Handle reply save
    const handleSave = () => {
        if (!replyInput.trim()) return;
        addReply(comment.id, replyInput);
        setReplyInput("");
        setShowReplyBox(false);
    };

    const handleChange = (e) => {
        setReplyInput(e.target.value)
    }

    // emoji 
    const addEmoji = (e) => {
        const sym = e.unified.split("_")
        const emojiArray = []
        sym.forEach((el) => emojiArray.push("0x" + el))
        const emojis = String.fromCodePoint(...emojiArray)
        setReplyInput(replyInput + emojis)
    }
    const handleonClick = () => {
        setIsEmoji(!isEmoji)
        setShowReplyBox(true)
    }
    return (
        <div>
            <div className=' w-70 border' style={{ padding: "20px", marginLeft: "40px", marginBottom: "20px", borderRadius: "15px", }}>
                <div className="d-flex align-items-center" >
                    <img
                        src={comment?.photoURL}
                        alt={comment?.userName}
                        className="rounded-circle me-3"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                    <p >{comment?.userName}</p>
                </div>
                <p className='fs-5 text-muted'>{comment.text}</p>
                <div className='d-flex'>
                    <button className="btn btn-light border-0 text-muted" type="text" onClick={handleonClick}>
                        <img
                            src={Emoji_img}
                            alt={Emoji_img}
                            className="rounded-circle me-3"
                            style={{ width: '20px', height: '20px', objectFit: 'cover' }}
                        />|
                    </button>
                    {
                        !showReplyBox && (
                            <button className="btn btn-light border-0 text-muted" type="button" onClick={() => setShowReplyBox(true)}>
                                reply  |
                            </button>)}
                    <button className="btn btn-light border-0 text-muted" type="button">
                        2 min
                    </button>
                </div>
            </div>
            <div>
                {isEmoji && <div>
                    <Picker
                        data={data}
                        onEmojiSelect={addEmoji}
                    />
                </div>}
                {showReplyBox && (
                    <div >
                        <CustomInput
                            value={replyInput}
                            handleChange={handleChange}
                            handleSave={handleSave}
                            replay={true}
                            setShowReplyBox={setShowReplyBox} />
                    </div>
                )}
                
                {
                    comment.children.length > 0 && (
                        <div style={{ paddingLeft: "20px" }}>
                            {comment.children.map(childComment => (
                                <CommentInput
                                    key={childComment.id}
                                    comment={childComment}
                                    addReply={addReply}
                                />
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default CommentInput;
