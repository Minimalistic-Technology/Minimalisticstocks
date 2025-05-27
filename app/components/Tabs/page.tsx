// type TabProps = {
//   activeTab: "Overview" | "News" | "Events";
//   setActiveTab: (tab: "Overview" | "News" | "Events") => void;
// };

// export default function Tabs({ activeTab, setActiveTab }: TabProps) {
//   const tabs: ("Overview" | "News" | "Events")[] = ["Overview", "News", "Events"];

//   return (
//     <div className="flex space-x-6 border-b border-gray-300 mb-6 px-4 sm:px-0 overflow-x-auto">
//       {tabs.map((tab) => (
//         <button
//           key={tab}
//           onClick={() => setActiveTab(tab)}
//           className={`pb-2 text-lg font-medium whitespace-nowrap ${
//             activeTab === tab
//               ? "text-green-600 border-b-2 border-green-600"
//               : "text-gray-600"
//           }`}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>
//   );
// }
