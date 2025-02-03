import React, { useState, useEffect } from 'react';
import { Clock, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import { Discipline, Professor, Schedule } from '../../types/database';

const DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const HOURS2 = Array.from({ length: 11 }, (_, i) => i + 8);
const HOURS = ['8:30', '9:40', '10:50', '12:00', '13:05', '14:15', '15:20', '16:25', '17:30'];

export default function SchedulePage() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
  const [selectedProfessor, setSelectedProfessor] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedHour, setSelectedHour] = useState<number>(8);

  useEffect(() => {
    axios.get<Discipline[]>('http://localhost:3001/api/disciplina')
      .then(res => setDisciplines(res.data))
      .catch(err => console.error('Erro ao buscar disciplinas:', err));
    
    axios.get<Professor[]>('http://localhost:3001/api/professores')
      .then(res => setProfessors(res.data))
      .catch(err => console.error('Erro ao buscar professores:', err));

    axios.get<Schedule[]>('http://localhost:3001/api/horario')
      .then(res => setSchedule(res.data))
      .catch(err => console.error('Erro ao buscar horários:', err));
  }, []);

  const addScheduleItem = () => {
    if (!selectedDiscipline || !selectedProfessor) return;

    const newScheduleItem: Omit<Schedule, 'id' | 'created_at'> = {
      day_of_week: selectedDay,
      start_time: `${selectedHour}:00:00`,
      discipline_id: selectedDiscipline,
      professor_id: selectedProfessor,
    };

    axios.post<Schedule>('http://localhost:3001/api/horario', newScheduleItem)
      .then(res => setSchedule([...schedule, res.data]))
      .catch(err => console.error('Erro ao adicionar horário:', err));
  };

  const removeScheduleItem = (id: string) => {
    axios.delete(`http://localhost:3001/api/horario/${id}`)
      .then(() => setSchedule(schedule.filter(item => item.id !== id)))
      .catch(err => console.error('Erro ao remover horário:', err));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">School Schedule</h1>
      <div className="grid grid-cols-4 gap-4">
        <select value={selectedDiscipline} onChange={(e) => setSelectedDiscipline(e.target.value)}>
          <option value="">Select Discipline</option>
          {disciplines.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        <select value={selectedProfessor} onChange={(e) => setSelectedProfessor(e.target.value)}>
          <option value="">Select Professor</option>
          {professors.filter(p => p.discipline_id === selectedDiscipline).map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <select value={selectedDay} onChange={(e) => setSelectedDay(Number(e.target.value))}>
          {DAYS.map((day, index) => (
            <option key={index} value={index + 1}>{day}</option>
          ))}
        </select>

        <select value={selectedHour} onChange={(e) => setSelectedHour(Number(e.target.value))}>
          {HOURS.map((hour) => (
            <option key={hour} value={hour}>{hour}:00</option>
          ))}
        </select>

        <button onClick={addScheduleItem} className="bg-indigo-600 text-white px-4 py-2 rounded-md">
          <Plus className="w-4 h-4" /> Add Class
        </button>
      </div>

      <table className="min-w-full mt-6">
        <thead>
          <tr>
            <th>Time</th>
            {DAYS.map((day) => <th key={day}>{day}</th>)}
          </tr>
        </thead>
        <tbody>
          {HOURS.map((hour) => (
            <tr key={hour}>
              <td>{hour}:00</td>
              {DAYS.map((_, dayIndex) => (
                <td key={dayIndex}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
