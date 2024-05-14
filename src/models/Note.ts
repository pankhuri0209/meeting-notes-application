export interface Note {
  _id: string;
  noteId: number;
  title: string;
  date_created: string;
  content: string;
  action_items: string[];
}

// export const notes: Array<Note> = [
//   {
//     title: "Meeting 1",
//     date_created: "03/25/2022",
//     noteId: 1,
//     content:
//       "Review budget and plan for next quarter will entail a comprehensive review of the current progress, challenges encountered, and upcoming milestones. Following the discussion, tasks will be allocated to team members based on their expertise and availability to ensure efficient execution and timely completion of project objectives.",
//     action_items: ["Analyze expenses", "Prepare budget"],
//   },
//   {
//     title: "Meeting 2",
//     date_created: "03/29/2022",
//     noteId: 2,
//     content:
//       "The project status meeting will entail a comprehensive review of the current progress, challenges encountered, and upcoming milestones. Following the discussion, tasks will be allocated to team members based on their expertise and availability to ensure efficient execution and timely completion of project objectives.",
//     action_items: ["Follow up with client", "Prepare presentation"],
//   },
// ];
