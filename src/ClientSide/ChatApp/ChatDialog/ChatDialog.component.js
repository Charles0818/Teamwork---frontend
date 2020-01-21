import React from 'react';

const ChatUI = () => {
    return (
        <div className="bckgr-white">
            <nav className="d-flex justify-content--s-between nowrap chat-nav padding-sm">
                <i className="fas fa-arrow-left margin-right-sm color2"></i>
                <div className="about--user">
                    <div className="avatar--sm margin-right-sm">
                        <img src="" alt="" />
                    </div>
                    <div className="d-flex column">
                        <p className="font-sm color-dark font-weight-600 margin-bottom-sm"></p>
                        <span className="last-active font-xsm gray-color">active 29 minutes ago</span>
                    </div>
                </div>
                <i className="fas fa-ellipsis-v color2"></i>
            </nav>
            <section className="padding-sm padding-top-md">
                <div className="d-flex column align-items--center">
                    <div className="avatar--md">
                        <img src="" alt="" className="margin-bottom-md border-r-circle" />
                    </div>
                    <p className="username font-md font-weight-600 margin-bottom-sm"></p>
                    <span className="gray-color font-xsm">Junior Software Engineer at IT department</span>
                </div>
            </section>
        </div>
    )
}

export default ChatUI