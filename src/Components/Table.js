import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
let currentUsr = [];
const Table = (props) => {
    const userData = props.users
    const onTrigger = (event) => {
        props.handleChange(event[0]);
        currentUsr = event;
    }
    const updateMap = (index) => {
        props.handleChange(currentUsr[index]);
    }
    return (
        <div className="container">
            <div className='row mt-4'>
                <div className='col-sm'>
                    <Link to={'/admin/addUser'} className=" btn btn-info btn-sm">Add User</Link>
                    <hr />
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Users</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(userData && userData.length > 0) ? userData.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{data[0].userId}</td>
                                        <td><button className="btn btn-info" onClick={(ev) => onTrigger(data)}>View</button></td>
                                    </tr>
                                )
                            }) :<tr><td colSpan='2'>Fetching data</td></tr>}
                        </tbody>
                    </table>
                    <hr />
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Start Date</th>
                                <th>Start Time</th>
                                <th>End Date</th>
                                <th>End Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentUsr.length > 0 ? currentUsr.map((d, i) => {
                                    let date = new Date(d.startDate);
                                    let sdt = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                                    let stime = date.toLocaleTimeString();
                                    let edate = new Date(d.endDate);
                                    let edt = edate.getDate() + '/' + (edate.getMonth() + 1) + '/' + edate.getFullYear();
                                    let etime = edate.toLocaleTimeString();
                                    return (
                                        <tr>
                                            <td>{d.userId}</td>
                                            <td>{sdt}</td>
                                            <td>{stime}</td>
                                            <td>{edt}</td>
                                            <td>{etime}</td>
                                            <td><button className="btn btn-info" onClick={(ev) => updateMap(i)}>Get Map</button></td>
                                        </tr>
                                    );
                                }) : <tr><td colSpan='6'>Loading data....</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Table
