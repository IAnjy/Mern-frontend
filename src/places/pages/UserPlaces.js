import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

// const DUMMY_PLACES = [
//   {
//     id:'p1',
//     title:'Empire State Building',
//     description: 'One of the most famous sky scrapers in the world!',
//     imageUrl: '/image/paris.jpg',
//     address: '20 W 34th St, New York, NY 10001',
//     location: {
//       lat: 40.7484405,
//       lng: -73.9878584
//     },
//     creator:'u1'
//   },
//   {
//     id:'p2',
//     title:'Empire State Building 2',
//     description: 'One of the most famous sky scrapers in the world!',
//     imageUrl: '/image/paris.jpg',
//     address: '20 W 34th St, New York, NY 10001',
//     location: {
//       lat: 40.7484405,
//       lng: -73.9878584
//     },
//     creator:'u2'
//   }
// ];

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const userId = useParams().userId;  

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        // console.log(responseData);
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  // const loadedPlaces = DUMMY_PLACES.filter(place =>place.creator === userId);

  const placeDeleteHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
  
  } ;

  return <React.Fragment>
      <ErrorModal error= {error} onClear={clearError}/>
      {isLoading && (
        <div className="center">
          <LoadingSpinner/>
        </div>
      )}

      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />};
      {/* <PlaceList items={loadedPlaces}/> */}
    </React.Fragment>
};

export default UserPlaces;