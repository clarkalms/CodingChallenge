// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAtSYXjJYOEqF6BdaoYqVWTonhoGleJB5Q',
	authDomain: 'posts-dd7ca.firebaseapp.com',
	projectId: 'posts-dd7ca',
	storageBucket: 'posts-dd7ca.appspot.com',
	messagingSenderId: '1059345948574',
	appId: '1:1059345948574:web:74f28d3abea3914aa5808f',
	measurementId: 'G-YLVS0D22RV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
