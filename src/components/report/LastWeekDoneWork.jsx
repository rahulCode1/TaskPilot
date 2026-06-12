import { Pie } from "react-chartjs-2";
import "./chartSetup";

const LastWeekDoneWork = ({ tasks }) => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const last7DaysTasks = tasks.filter((task) => {
    const taskDate = new Date(task.createdAt.replace(",", "T"));
    return task.status === "Completed" && taskDate >= sevenDaysAgo;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const completionRate =
    totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

  const allTasks = tasks.length;
  const completedTask = last7DaysTasks.length;

  const data = {
    labels: ["In Progress", "Completed"],
    datasets: [
      {
        label: "Task",
        data: [allTasks - completedTask, completedTask],
        backgroundColor: ["#3b82f6", "#22c55e"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percent = ((value / total) * 100).toFixed(1);
          return `${value}\n(${percent}%)`;
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 shadow rounded">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Last 7 Days Performance
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Track your completed tasks from the past week
      </p>
      <div className="grid grid-cols-1 text-dark sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 ">
          <div className="text-sm font-medium opacity-90 text-dark">
            Total Tasks
          </div>
          <div className="text-3xl font-bold mt-2">{totalTasks}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-6 ">
          <div className="text-sm font-medium opacity-90">Completed</div>
          <div className="text-3xl font-bold mt-2">{last7DaysTasks.length}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md p-6  sm:col-span-2 lg:col-span-1">
          <div className="text-sm font-medium opacity-90">Completion Rate</div>
          <div className="text-3xl font-bold mt-2">{completionRate}%</div>
        </div>
      </div>
      <div
        className="flex justify-center items-center"
        style={{ maxWidth: "350px", margin: "0 auto" }}
      >
        <Pie data={data} options={options} />
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Completed:</span>
          <span className="font-semibold text-green-600">{completedTask}</span>
        </div>
      </div>
    </div>
  );
};

export default LastWeekDoneWork;
