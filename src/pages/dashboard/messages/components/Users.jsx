import React, { memo, useEffect } from 'react';
import userImg from '../../../../assets/images/user.jpg';
import { MoreHorizontal, Trash } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteOneNotification } from '../../../../redux/reducers/notificationsReducer';
import { deleteOneConversation } from '../../../../redux/reducers/chatReducer';

function Users(props) {
    const { users, selectedUser, getMessages, removeNotificationWithSelectedUser } = props;
    const dispatch = useDispatch();

    const handleDelete = (notificationId) => {
        const item = { id: notificationId }; // item ob'ekti yaratamiz
        dispatch(deleteOneNotification(item)); // deleteOneNotificationni chaqiramiz
    };

    const removeRoom = (e, item) => {
        if (window.confirm("Вы уверены, что хотите удалить этот разговор?")) {
            dispatch(deleteOneConversation(item));
        }
    };
    return (
        users.map(item => (
            item.initiator?.id !== item.receiver?.id && (
                <>
                    <div
                        role='button'
                        key={item.id} className={`getMessagesUsers select-none flex items-center gap-2 p-3 rounded-lg shadow mb-3 cursor-pointer transition-all ${item.id === selectedUser.id ? "bg-custom-gray text-white" : "bg-white text-custom-gray hover:bg-gray-100"}`}
                        onClick={() => {
                            getMessages(item);
                            handleDelete(item.id);
                        }}>

                        {item.receiver.id !== props.profileData.id ? (
                            <img
                                src={item.receiver?.avatar ? userImg : userImg}
                                alt={"no image"}
                                className='rounded-full w-10 h-10 object-cover'
                            />
                        ) : (
                            <img
                                src={item.initiator?.avatar ? item.initiator?.avatar : userImg}
                                alt={"no image"}
                                className='rounded-full w-10 h-10 object-cover'
                            />
                        )}
                        <div className='flex items-center justify-between w-full'>
                            <h5 className='font-gilroy-bold text-xs'>
                                {item.receiver.id !== props.profileData.id ? (
                                    <span>
                                        {item.receiver?.first_name} {item.receiver?.last_name}
                                    </span>
                                ) : (
                                    <span>
                                        {item.initiator?.first_name} {item.initiator?.last_name}
                                    </span>
                                )}
                            </h5>
                            <p onClick={(e) => removeRoom(e, item)} className='text-sm text-gray-400 w-[30px] h-[30px] flex items-center justify-center'>
                                <Trash className='text-[#B7ED1D] fill-[#B7ED1D] active:scale-[1.1]' />
                            </p>
                        </div>
                    </div>
                </>
            )
        ))
    );
}

export default memo(Users);
