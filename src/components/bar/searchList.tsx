import React, {useEffect, useState} from "react";
import {IUsersSearchWithUsersSearchInputFunResponse} from "../../apollo/queries/searchUser";
import {IUser} from "../../models";

interface ISearchListProps {
    data: IUsersSearchWithUsersSearchInputFunResponse
}

const SearchList: React.FC<ISearchListProps> = ({data: {users}}) => {
    const [shouldShowList, setShouldShowList] = useState(false);
    const handleShow = (theShow: boolean) => {
        console.log({theShow})
        if (theShow) {
            document.addEventListener(
                'click',
                handleShow.bind(null, !theShow),
                true
            )
        } else {
            document.removeEventListener(
                'click',
                handleShow.bind(null, !theShow),
                true
            )
        }
        setShouldShowList(theShow);
    }
    const processUserList = (users: IUser[]) => {
        if (users.length) {
            handleShow(true)
        } else {
            handleShow(false)
        }
    }
    useEffect(() => {
        console.log('useEffect1')
        processUserList(users)
    }, [users])
    useEffect(() => {
        console.log('useEffect2')
        return () => {
            console.log('useEffect2/removeListener')
            document.removeEventListener(
                'click',
                handleShow.bind(null, !shouldShowList),
                true
            )
        }
    })
    return shouldShowList ?
        (
            <div className="result">
                {users.map((user, idx) => {
                    return (
                        <div key={user.id} className="user">
                            <img src={user.avatar} alt={`${user.username} 的圖片`}/>
                            <span>{user.username}</span>
                        </div>
                    )
                })}

            </div>
        ) : (
            <div className="result">NOOO REsulttttt</div>
        )
}
export default SearchList;