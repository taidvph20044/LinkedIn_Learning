import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import axios from 'axios';
import './Certificate.css'
import emailjs from '@emailjs/browser';
import { useParams } from 'react-router-dom';
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Certificate = () => {
    const [user, setUser] = useState<User | null>(null);
    const form = useRef();
    const [name, setName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const { id } = useParams();
    const contentRef = useRef(null);
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, [auth]);


    useEffect(() => {
        
        const apiUrl = `http://localhost:3000/Courses/${id}`;

       
        axios.get(apiUrl)
            .then((response) => {
                const course = response.data;
                setCourseData(course);
                console.log(course);
            })
            .catch((error) => {
                console.error('Error fetching course data:', error);
            });
    }, [id]); 


    const generateCertificate = () => {
        const content = contentRef.current;
        html2canvas(content)
            .then(canvas => {
                const image = canvas.toDataURL('image/png');
                
                console.log(image);
                
                const certificateImage = new Image();
                certificateImage.src = image;
                document.body.appendChild(certificateImage);
            });
    };

    const sendEmail = (e: any) => {
        e.preventDefault();

        emailjs.sendForm('service_la6yzel', 'template_604npzp', e.target, 'lFDsvwdsjxYGi8aQ9')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

 

    if (courseData === null) {
        return <p>Loading...</p>;
    }
    if (!user) {
        return (
            <div className='notlogin mt-4 mb-4 text-center'>
               deađuawa
                </div>
        );
    }
    return (
        <div>
            <div style={{ display: 'flex', gap:'10px' }}>
                <button style={{
                    backgroundColor: '#476A69',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                }} onClick={generateCertificate}>Tạo chứng chỉ</button>
                <form ref={form} onSubmit={sendEmail}>
                    <input className='hudk' readOnly type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input className='hudk' readOnly type="email" name="user_email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                    <input
                        className="bt-hu"
                        type="submit"
                        value="Gửi thông tin tới Email"
                        style={{
                            backgroundColor: '#476A69',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer',
                        }}
                    />
                </form>
            </div>

            <div ref={contentRef}>
                <div className="certificate">
                    <div className='cer-top'>
                        <img src="https://f11-zpcloud.zdn.vn/877077799436060275/184c5f703c91ebcfb280.jpg" alt="" />
                        <img className='cer-top-1' src="https://f11-zpcloud.zdn.vn/6738613259714560878/42cb06f76516b248eb07.jpg" alt="" />
                    </div>
                    <div className="hr-cer"></div>
                    <div className='t22'>
                        <p>Certificate of Completion</p>
                    </div>
                    <p className='t33'> This is to acknowledge that</p>
                    <p className="name"><u>{user.displayName}</u></p>
                    <p className="t44">has completed</p>
                    <p className="course">A Training Course on: <b><u>  {courseData.courseName}  </u></b></p>
                </div>
            </div>
        </div>
    );
}

export default Certificate;
