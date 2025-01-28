import React, { useState, useEffect } from 'react';
import { Clock, Plus, Trash2 } from 'lucide-react';
import type { Discipline, Professor, Schedule } from '../types/database';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM

export default function SchedulePage() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedHour, setSelectedHour] = useState(8);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: disciplinesData } = await supabase.from('discipline').select('*');
    const { data: professorsData } = await supabase.from('professor').select('*');
    const { data: scheduleData } = await supabase.from('schedule').select('*');

    if (disciplinesData) setDisciplines(disciplinesData);
    if (professorsData) setProfessors(professorsData);
    if (scheduleData) setSchedule(scheduleData);
  }

  const validateSchedule = (
    day: number,
    hour: number,
    disciplineId: string
  ): boolean => {
    // Check if there's already a class at this time
    const existingClass = schedule.find(
      (s) => s.day_of_week === day && 
      new Date(`1970-01-01T${s.start_time}`).getHours() === hour
    );
    if (existingClass) return false;

    // Check if it's physical education after lunch (12-14)
    const discipline = disciplines.find(d => d.id === disciplineId);
    if (discipline?.name.toLowerCase().includes('physical education') && hour > 12) {
      return false;
    }

    // Count classes for this discipline on this day
    const classesForDiscipline = schedule.filter(
      (s) => s.day_of_week === day && s.discipline_id === disciplineId
    ).length;
    if (classesForDiscipline >= 3) return false;

    // Count total classes for this day
    const classesForDay = schedule.filter((s) => s.day_of_week === day).length;
    if (classesForDay >= 8) return false;

    return true;
  };

  const addScheduleItem = async () => {
    if (!selectedDiscipline || !selectedProfessor) return;

    if (!validateSchedule(selectedDay, selectedHour, selectedDiscipline)) {
      alert('This schedule violates one or more rules!');
      return;
    }

    const { data, error } = await supabase.from('schedule').insert([
      {
        day_of_week: selectedDay,
        start_time: `${selectedHour}:00:00`,
        discipline_id: selectedDiscipline,
        professor_id: selectedProfessor,
      },
    ]);

    if (error) {
      console.error('Error adding schedule:', error);
      return;
    }

    fetchData();
  };

  const removeScheduleItem = async (id: string) => {
    const { error } = await supabase.from('schedule').delete().eq('id', id);
    if (error) {
      console.error('Error removing schedule:', error);
      return;
    }
    fetchData();
  };

  const getScheduleItem = (day: number, hour: number) => {
    return schedule.find(
      (s) => 
        s.day_of_week === day && 
        new Date(`1970-01-01T${s.start_time}`).getHours() === hour
    );
  };

  const getDisciplineName = (id: string) => {
    return disciplines.find(d => d.id === id)?.name || '';
  };

  const getProfessorName = (id: string) => {
    return professors.find(p => p.id === id)?.name || '';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">School Schedule</h1>
        
        {/* Schedule Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
            >
              <option value="">Select Discipline</option>
              {disciplines.map((discipline) => (
                <option key={discipline.id} value={discipline.id}>
                  {discipline.name}
                </option>
              ))}
            </select>

            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={selectedProfessor}
              onChange={(e) => setSelectedProfessor(e.target.value)}
            >
              <option value="">Select Professor</option>
              {professors
                .filter((p) => !selectedDiscipline || p.discipline_id === selectedDiscipline)
                .map((professor) => (
                  <option key={professor.id} value={professor.id}>
                    {professor.name}
                  </option>
                ))}
            </select>

            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
            >
              {DAYS.map((day, index) => (
                <option key={day} value={index + 1}>
                  {day}
                </option>
              ))}
            </select>

            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={selectedHour}
              onChange={(e) => setSelectedHour(Number(e.target.value))}
            >
              {HOURS.map((hour) => (
                <option key={hour} value={hour}>
                  {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                </option>
              ))}
            </select>

            <button
              onClick={addScheduleItem}
              className="col-span-full md:col-span-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Class
            </button>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                {DAYS.map((day) => (
                  <th
                    key={day}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {HOURS.map((hour) => (
                <tr key={hour}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                    </div>
                  </td>
                  {DAYS.map((_, dayIndex) => {
                    const scheduleItem = getScheduleItem(dayIndex + 1, hour);
                    return (
                      <td key={dayIndex} className="px-6 py-4 whitespace-nowrap">
                        {scheduleItem ? (
                          <div className="flex items-center justify-between gap-2 bg-indigo-50 p-2 rounded-md">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {getDisciplineName(scheduleItem.discipline_id)}
                              </div>
                              <div className="text-sm text-gray-500">
                                {getProfessorName(scheduleItem.professor_id)}
                              </div>
                            </div>
                            <button
                              onClick={() => removeScheduleItem(scheduleItem.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}