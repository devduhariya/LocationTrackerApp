import React from 'react'
import '../App.css'
const Table = (props) => {
    // console.log('props',props)
    const userData = props.users
    // console.log('userData', userData)

   const  onTrigger = (event) => {
        props.handleChange(event);
        // event.preventDefault();
        console.log('evevevevevnt',event)
    }
    return (
        <div className="container">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Start Location</th>
                        <th>Start Date</th>
                        <th>Start Time</th>
                    </tr>
                </thead>
                <tbody>
                    {(userData && userData.length > 0) ? userData.map((data, index) => {
                        const date = new Date(data.startDate);
                        const dt = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                        const time = date.toLocaleTimeString();
                        return (
                            <tr key={index}>
                                <td className=""><button className="btn btn-info" onClick={(ev)=>onTrigger(data._id)}>{data.userId}</button></td>
                                <td>
                                    <div>lat:{data.coordinates[0] && data.coordinates[0].lat}</div>
                                    <div>lng:{data.coordinates[0] && data.coordinates[0].lng}</div>
                                </td>
                                <td>{dt}</td>
                                <td>{time}</td>
                            </tr>
                        )
                    }) : <tr><td colSpan="5">Loading...</td></tr>}
                </tbody>
            </table>

        </div>
    )
}
export default Table
