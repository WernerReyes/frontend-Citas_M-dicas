import Chart from 'chart.js/auto';
import { getEarnings } from '../../../../../services/api/payment';

const graphicSection = () => {
  const section = document.createElement('section');
  section.classList.add('col-12', 'col-md-6', 'col-lg-8', 'mx-auto');
  section.id = 'graphic-section';

  const canvas = document.createElement('canvas');
  canvas.classList.add('my-4', 'w-100');
  canvas.id = 'myChart';
  graphic(canvas); // <-- Call the function that creates the graphic

  section.appendChild(canvas);

  return section;
};

export default graphicSection;

const graphic = async (canvas) => {
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


  const { earnings } = await getEarnings();

  const data = {
    labels: labels,
    datasets: [{
      label: `Ganancia del año ${new Date().getFullYear()}`,
      data: earnings,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(0, 123, 255, 0.5)'
    }]
  };

  const ctx = canvas.getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
};
