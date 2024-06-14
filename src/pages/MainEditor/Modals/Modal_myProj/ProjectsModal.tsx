// ProjectModal.js
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import ProjectsStore from './ProjectsStore';
import '../Modal.css';
// import ErrorMessage from '../../components/Error/ErrorMessage';
import './Proj.css'

const ProjectModal = observer(() => {
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const closeModal = () => {
    ProjectsStore.closeModal();
  }

  const handleCreateProject = () => {
    ProjectsStore.setNewProjectName(newProjectName);
    ProjectsStore.setNewProjectDescription(newProjectDescription);
    ProjectsStore.createNewProject();
  };

  // const handleProj = () => {
  //   ProjectsStore.createProject();
  // }

  const handleProjectClick = (projectId) => {
    ProjectsStore.fetchProjectDetails(projectId);
  }

  const projectsPerPage = 4; // Количество проектов на одной странице

  const startIndex = currentPage * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;

  const handlePageChange = (increment) => {
    setCurrentPage(prevPage => prevPage + increment);
  }


  return (
    <Modal
      isOpen={ProjectsStore.isOpen}
      onRequestClose={closeModal}
      contentLabel="Projects Modal"
      ariaHideApp={false}
      className="modal proj-modal"
    >
      <h2 className='header'>My projects</h2>
      {ProjectsStore.currentProject ? (
        <div className="project-details">
          <h3 className="project-title">Project name: {ProjectsStore.currentProject.title}</h3>
          <p className="project-description">Project description: {ProjectsStore.currentProject.description}</p>
        </div>
      ) : (
      <ul>
          {ProjectsStore.projects.slice(startIndex, endIndex).map(project => (
            <li key={project.id} onClick={() => handleProjectClick(project.id)}>
              {/* <button className='SideBar-button button_neutral' type="button">{project.title}</button> */}
                <button className='text_nave button_neutral highlight' type="button">{project.title}</button>
            </li>
            ))
          }
          {/* <div>
            <input
              type="text"
              placeholder="Enter project name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <textarea
              placeholder="Enter project description"
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
            />
            <button onClick={handleCreateProject} type="button" className='add'>Create Project</button>
          </div> */}
        </ul>
      )}
      <div className='button-row'>
        <button onClick={() => handlePageChange(-1)} disabled={currentPage === 0} type="button" className='delete'>Previous</button>
        <button onClick={() => handlePageChange(1)} disabled={endIndex >= ProjectsStore.projects.length} type="button" className='delete'>Next</button>
        <button onClick={closeModal} type="button" className='close'>Close</button>
      </div>
    </Modal>
  );
});

export default ProjectModal;
