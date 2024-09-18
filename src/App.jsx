import { useState } from "react";

import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";



function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []

  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      console.log("New Task Object:", newTask); // Stampa l'oggetto task appena creato
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  console.log("Updated Tasks:", projectsState.tasks);

  

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }



  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
  });
  }
  
  function handleStartAddProject() {
    setProjectsState(prevState => {
        const newState = {
            ...prevState,
            selectedProjectId: null, 
        };
        return newState;
    });
}

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      const newState = {
          ...prevState,
          selectedProjectId: undefined, 
      };
      return newState;
  });
  }


  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const projectId = Math.random()
      const newProject = {
        ...projectData,
        id: projectId,

      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
     return {
          ...prevState,
          selectedProjectId: undefined, 
          projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId
        ),
      };
  });
  }



  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = (
    <SelectedProject 
      project={selectedProject} 
      onDelete={handleDeleteProject} 
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddproject={handleStartAddProject} />;
  } 

  return (
    <main className="h-screen my-8 flex gap-8">
    <ProjectSidebar 
      onStartAddproject={handleStartAddProject} 
      projects={projectsState.projects}
      onSelectProject={handleSelectProject}
      selectedProjectId={projectsState.selectedProjectId}
    />
    {content}
    </main>
  );
}

export default App;
