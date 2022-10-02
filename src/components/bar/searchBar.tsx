import React, {ChangeEvent, useState} from "react";
import {queries} from "../../apollo";
import SearchList from "./searchList";


const SearchBar: React.FC = () => {
    const [text, setText] = useState('')
    const {data, error, loading} =
        queries.useQueryForSearchUserWithUsersSearchInput({text, pageNum: 0, pageSize: 5})
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }
    console.log({data});
    console.log({'data length': data?.usersSearch.users.length})
    return (
        <div className="search">
            <input
                type="text"
                onChange={changeHandler}
                value={text}
            />
            {!loading &&
                !error &&
                data &&
                <SearchList data={data.usersSearch}/>
            }
        </div>
    )
}

export default SearchBar;