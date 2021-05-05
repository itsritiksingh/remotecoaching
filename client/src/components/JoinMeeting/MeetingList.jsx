import React, { useEffect } from 'react'
import { List, message, } from 'antd'
import day from 'dayjs';
import {Link} from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
day.extend(relativeTime);

export const MeetingList = ({ data }) => {
    function addSchedule(_id){
        const userId =  jwt_decode(JSON.parse(localStorage.getItem('jwt')).ACCESS_TOKEN)._id;
        axios.post(`/user/meeting/${_id}`,{userId}).then(()=>{
           window.location.reload();
        }).catch(er => {
            console.log(er);
            message.error("Server error");
        })
    }

    function createButton(item) {
        let buffer = [];
        if(new day(item.start) > new Date())
         {
            buffer.push(<a key={`/conf/${item._id}`} onClick={()=>addSchedule(item._id)}>Schedule</a>);
         }else if(new day(item.start) < new Date() ){
            buffer.push(<Link to={`/conf/${item._id}`}>Join</Link>);
         }
         return buffer;
    }

    return (
        <>
            <List
                style={{ width: "100%" }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        actions={createButton(item)}
                    >
                        <List.Item.Meta
                            title={item.name}
                            description={new day(item.start) > new Date() ? day(item.start).fromNow() : ""}
                        />
                        {item.startedBy.name}
                    </List.Item>
                )}
            ></List>
        </>
    )
}
