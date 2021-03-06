import './App.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlane} from "@fortawesome/free-solid-svg-icons";
import Profile from "./profile";
import ExploraListas from "./ExploraListas";
import {useEffect, useRef, useState} from "react";
import content from "./content.json"
import ProfilesCard from "./ProfilesCard";
import ProfileDetail from "./ProfileDetail";

const allUsers = content.users

function App() {

    const [selectedUser, setSelectedUser] = useState(null)
    const [category, setCategory] = useState(null)

    const users = allUsers.filter((user)=> category? user.categoria===category : true)

    const detailRef = useRef(null)

    useEffect(()=>{
        if (detailRef.current) {
            detailRef.current.scrollIntoView()
        }
    }, [selectedUser])

    return (
        <div className="container-md body">
            <header className="d-flex justify-content-between yellow-color mt-5">
                <h1>trojanair<FontAwesomeIcon icon={faPlane} className="yellow-color"/></h1>

                <i className="bi bi-search "></i>
            </header>

            <div className="d-flex flex-md-row-reverse flex-column-reverse both-card-containers">
                {!selectedUser && <div className="d-flex flex-column flex-wrap card-container">
                    <ProfilesCard title="Volando Ahora" users={users} setSelectedUser={setSelectedUser}/>
                    <div className="d-flex justify-content-between three-card-layout">
                        {users.filter(users => users.volando === true).slice(0, 3).map(e =>
                            <div className="" key={e.name} >
                                <Profile isCard={true} user={e} setSelectedUser={setSelectedUser}/>
                            </div>)}

                    </div>
                </div>}

                <div className="d-flex flex-column flex-wrap card-container mb-3">
                    <ExploraListas category={category} setCategory={setCategory}/>
                    <ProfilesCard title="Favoritos" users={users} setSelectedUser={setSelectedUser}/>
                    <div className="d-flex justify-content-between three-card-layout">
                        {users.slice(0, 3).map(e =>
                            <div className="" key={e.name} >
                                <Profile isCard={true} user={e} setSelectedUser={setSelectedUser}/>
                            </div>)}

                    </div>
                </div>
                {selectedUser && <ProfileDetail user={selectedUser} setSelectedUser={setSelectedUser} ref={detailRef}/>}
            </div>
        </div>
    );
}

export default App;
