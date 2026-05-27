import axios from "axios";
import TaskDetails from "../components/task/TaskDetails";
import { Await,  useRouteLoaderData } from "react-router-dom";
import privateApi from "../api/axios";

import {
  showLoadingToast,
  showSuccessToast,
  showErrorToast,
} from "../utils/toast";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import { Suspense } from "react";

const TaskDetailsPage = () => {
  const { task } = useRouteLoaderData("task_detail_id");

  return (
    <Suspense fallback={<LoadingSpinner size={30} />}>
      <Await resolve={task}>
        {(isTaskLoad) => <TaskDetails task={isTaskLoad} />}
      </Await>
    </Suspense>
  );
};

export default TaskDetailsPage;

const task = async (taskId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/task/${taskId}`
    );

    return response?.data?.task;
  } catch (error) {
    console.log(error);
  }
};

export const loader = async ({ request, params }) => {
  const taskId = params.id;

  return {
    task: task(taskId),
  };
};

export const action = async ({ request, params }) => {
  const taskId = params.id;
  const toastId = showLoadingToast("Update status...");

  try {
    await privateApi.patch(
      `${process.env.REACT_APP_BACKEND_URL}/task/${taskId}`,
      { status: "Completed" }
    );
    showSuccessToast(toastId, `Status update to Completed`);
  } catch (error) {
    showErrorToast(toastId, error.response?.data?.message);
  }
};
