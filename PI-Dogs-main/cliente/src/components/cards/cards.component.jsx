import {useState} from 'react';
import './cards.styles.css';
import Card from '../../components/card/card.component';

function Cards({ allUsers}) {
  const [currentPage, setCurrentPage] = useState(1);
  if (!allUsers) {
    return null; 
  }

  
  const usersPerPage = 8;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);


  const nextPage = () => {
    if (indexOfLastUser < allUsers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="cards-list">
        {currentUsers.map((user) => (
          <Card user={user} />
        ))}
      </div>
      <div className='container-botones-prev-sig'>
        <button className="botones-prev-sig" onClick={prevPage} disabled={currentPage === 1}> ← </button>
        <button className="botones-prev-sig" onClick={nextPage} disabled={indexOfLastUser >= allUsers.length}> → </button>
      </div>
    </div>
  );
}

export default Cards;