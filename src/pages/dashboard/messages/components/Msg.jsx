import React, { memo, useEffect, useRef } from 'react';
import MsgComponent from './MsgComponent';

function Msg({ data, profileData }) {
    const scroll_Ref = useRef();
    const chatBoxRef = useRef();

    // automatically scroll messages
    useEffect(() => {
        // if (scroll_Ref.current)
        //     scroll_Ref.current?.scrollIntoView({ behavior: "smooth" });
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [data])

    return (
        <div className='flex flex-col gap-2 h-[70vh] w-full overflow-y-scroll' ref={chatBoxRef}>
            {data?.messages?.length > 0 && data.messages.map(item => (
                <div key={item.id} className='py-2 px-2'>
                    <MsgComponent
                        item={item}
                        profileData={profileData}
                    />
                </div>
            ))}
            <div ref={scroll_Ref} />
        </div>
    )
}

export default memo(Msg);