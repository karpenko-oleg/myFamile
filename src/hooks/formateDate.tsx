
export const formatDate = (dateString: string | null | undefined): string => {
  // Проверка на пустое значение
  if (!dateString) return 'Дата не указана';

  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) return 'Некорректная дата';

    const day = date.getDate();
    const monthNames = [
      'января', 'февраля', 'марта', 'апреля', 
      'мая', 'июня', 'июля', 'августа',
      'сентября', 'октября', 'ноября', 'декабря'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year} год`;
  } catch (error) {
    console.error('Ошибка при форматировании даты:', error);
    return 'Ошибка формата даты';
  }
};