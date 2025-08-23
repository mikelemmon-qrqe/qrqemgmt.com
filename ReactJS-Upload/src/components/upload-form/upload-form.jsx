import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../../firebase'; // Assuming you have your Firebase app initialized here

function UserInfoForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const db = getFirestore(app); // Get a reference to your Firestore database

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Add a new document to the 'videos' collection
      const docRef = await addDoc(collection(db, 'videos'), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
        timestamp: Date.now(),
        // You could also add user ID here if using Firebase Authentication
        // userId: auth.currentUser.uid,
      });
      console.log('Document written with ID: ', docRef.id);
      
      // Clear the form fields after successful submission
      setFirstName('');
      setLastName('');
      setEmail('');
      setAge('');

    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
            <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
            <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button type="submit">Submit Video</button>
    </form>
  );
}

export default UserInfoForm;
