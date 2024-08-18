import React from 'react';

const CustomInput = ({ value, handleChange, handleSave, replay, setShowReplyBox }) => {
    return (
        <div className='w-70 border' style={{ padding: "20px", margin: "20px", borderRadius: "15px", position: "relative" }}>
            <input
                style={{ outline: "none", boxShadow: "none", height: "50px" }}
                type="text"
                className="form-control w-100 border-0"
                placeholder="Write a comment..."
                value={value}
                onChange={handleChange}
            />
            <div style={{ display: "flex", borderTop: '1px solid #ccc', padding: "10px", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <button className="btn btn-light border-0" type="button">
                        <b>B</b>
                    </button>
                    <button className="btn btn-light border-0" type="button">
                        <u>U</u>
                    </button>
                    <button className="btn btn-light border-0" type="button">
                        📎
                    </button>
                </div>
                <div>
                    <button className="btn btn-dark me-2" type="button" onClick={handleSave}>
                        Send
                    </button>
                    {replay && (
                        <button className="btn btn-dark" type="button" onClick={() => setShowReplyBox(false)}>
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CustomInput;
