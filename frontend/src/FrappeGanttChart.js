import React, { useEffect, useRef } from 'react';
import Gantt from 'frappe-gantt';
import 'frappe-gantt/dist/frappe-gantt.css';

const FrappeGanttChart = ({ tasks }) => {
  const ganttRef = useRef(null);

  useEffect(() => {
    if (ganttRef.current && tasks.length > 0) {
      ganttRef.current.innerHTML = '';
      new Gantt(ganttRef.current, tasks, {
        view_mode: 'Day',
        date_format: 'YYYY-MM-DD',
        custom_popup_html: null,
      });
    }
  }, [tasks]);

  return <div ref={ganttRef} />;
};

export default FrappeGanttChart;
