import React from 'react'
import ListProjects from '../projects/ListProjects';
import NewProject from '../projects/NewProject';

const Sidebar = () => {
    console.log ( `react snippet works!` );

    return (
        <aside>
            <h1>Manager<span>Tasks</span></h1>

            <NewProject/>

            <div className="proyectos">
                <h2>Tus Proyectos</h2>
                <ListProjects/>                   
            </div>
        </aside>
    );
}

export default Sidebar;