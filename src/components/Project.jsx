import React, { useState } from 'react';
import './Project.css';
import logo from './Project2.png';

// Sample Project Data with document links
const projects = [
    {
        id: 1,
        title: 'Project Management Tool',
        imageUrl: './Tool.jpg',
        description: 'A streamlined tool for seamless project planning, team collaboration, and progress tracking.',
        documents: [
            { name: 'Client Project Description', url: 'Client Project Description.pdf' },
            { name: 'Roles and Responsibility', url: 'Roles and Responsibility.pdf' },
            { name: 'Five Months Workflow', url: 'Five Months Workflow.pdf' },
            { name: 'Architecture Overview', url: 'Architecture Overview.pdf' },
            { name: 'Website Architecture 1', url: 'Website Architecture 1.pdf' },
            { name: 'Website Architecture 2', url: 'Website Architecture 2.pdf' },
            { name: 'Project Members', url: 'Project Member.xlsx' },
            { name: 'Admin Login', url: 'Admin Login.pdf' },
            { name: 'React Js', url: 'React Js.pdf' },
            { name: 'Atteration Data', url: 'Atteration.pdf' },
            { name: 'CSS Concepts', url: 'CSS Concepts.ppt' },
            { name: 'HTML Concepts', url: 'HTML Concepts.ppt' },
            
        ],
    },
    // You can add more projects here...
];

const Project = () => {
    const [activeProject, setActiveProject] = useState(null);

    // Handle project click
    const handleProjectClick = (project) => {
        setActiveProject(project);
    };

    return (
        <div className="project-page">
            {/* Logo Image */}
            <img src={logo} alt="Project Logo" className="logo" />

            <header className="project-header">
                <h1 className="project-title">OnGoing Project</h1>
            </header>

            <div className="project-container">
                <div className="project-list">
                    {projects.map((project) => (
                        <div
                            className="project-item"
                            key={project.id}
                            onClick={() => handleProjectClick(project)}
                        >
                            <img src={project.imageUrl} alt={project.title} className="project-image" />
                            <h2>{project.title}</h2>
                            <p>{project.description}</p>
                        </div>
                    ))}
                </div>

                {activeProject && (
                    <div className="project-details">
                       
                        <h3>Project Documents</h3>
                        <ul>
                            {activeProject.documents.map((doc, index) => (
                                <li key={index}>
                                    <a href={doc.url} download>
                                        {doc.name} (Download)
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Project;
