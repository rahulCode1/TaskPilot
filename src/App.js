import WorkTrackProvider from './context/workTrackContext';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import DashboardScreenPage, { loader as taskLoader } from './pages/DashboardScreenPage';
import RootLayout from "./components/layout/RootLayout"
import ProjectInfoPage, { loader as projectDetailLoader } from './pages/ProjectInfoPage';
import AddTaskPage, { action as addTaskAction } from './pages/AddTaskPage';
import TaskDetailsPage, { loader as taskDetailsLoader, action as taskAction } from './pages/TaskDetailPages';
import TeamPage from './pages/TeamPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ReportPage from './pages/ReportPage';
import AddProject from './components/project/AddProject';
import ProjectPage from './pages/ProjectPage';
import TeamDetails, { loader as teamLoader } from './pages/TeamDetailsPage';
import TaskListPage from './pages/TaskListPage';
import EditTaskPage from './pages/EditTaskPage';
import SettingLayout from './components/layout/SettingLayout';
import Projects from './components/setting/Projects';
import Teams from './components/setting/Teams';
import TaskSetting from './pages/setting/TaskSetting';



const router = createBrowserRouter([
  {
    path: "/", element: <RootLayout />,
    loader: taskLoader,

    id: "task_id",
    children: [
      {
        index: true, element: <DashboardScreenPage />
      },
      {
        path: "addTask", element: <AddTaskPage />, action: addTaskAction
      },
      {
        path: "list", element: <TaskListPage />
      },
      {
        path: ":id",
        loader: taskDetailsLoader,
        id: "task_detail_id",
        children: [

          {
            index: true, element: <TaskDetailsPage />, action: taskAction
          },
          {
            path: "edit", element: <EditTaskPage />
          },
        ]
      },

      {
        path: "projects", children: [

          {
            index: true, element: <ProjectPage />
          },
          {
            path: "add", element: <AddProject />
          },
          {
            path: ":id", element: <ProjectInfoPage />, loader: projectDetailLoader
          },
        ]
      },
      {
        path: "team", children: [
          {
            index: true, element: <TeamPage />
          },
          {
            path: ":id", element: <TeamDetails />, loader: teamLoader
          }
        ],
      },
      {
        path: "signup", element: <SignupPage />,
      },
      {
        path: "login", element: <LoginPage />
      },
      {
        path: "report", element: <ReportPage />
      },
      {
        path: "setting", element: <SettingLayout />,
        children: [
          {
            index: true, element: <Navigate to="tasks" />,
          },
          {
            path: "teams", element: <Teams />,
          },
          {
            path: "projects", element: <Projects />,
          },
          {
            path: "tasks", element: <TaskSetting />,
          },
        ]
      }

    ]
  }
])


function App() {


  return <>
    <WorkTrackProvider>
      <RouterProvider router={router} />
    </WorkTrackProvider>
  </>
}

export default App;
