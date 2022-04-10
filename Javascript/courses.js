const coursesTable = document.querySelector('.coursesTable');
const courseDescription = document.querySelector('.courseDetails .descrip p');
const courseDuration = document.querySelector('.courseDetails .duration .infoValue');
const courseDifficulty = document.querySelector('.courseDetails .info .dific .infoValue');

async function fetchingCourses() {
    await fetch('https://securitycubes.com/api/challangeDetail/?Challangeid=' + localStorage.getItem('pathID'), {
        headers: {
            Authorization: "Token " + localStorage.getItem('token')
        }
    }).then(res => {
        res.json().then(json => {
            localStorage.setItem('challengeId', json[0].id);
            courseDescription.innerText = json[0].ChallangeDescription;
            courseDuration.innerText = json[0].Duration + ' mins';
            if(json[0].Easy === true) {
                courseDifficulty.innerText = 'Easy';
            } else if(json[0].Medium === true) {
                courseDifficulty.innerText = 'Intermediate';
            } else if(json[0].Hard === true) {
                courseDifficulty.innerText = 'Hard';
            }
            const courses = json[0].examples;
            for(let course of courses) { 

                const lession = document.createElement('div');
                lession.setAttribute('data-ID', course.id)
                lession.classList.add('lession');
                if(course.isSolved === true) lession.classList.add('done');

                const lessionLeft = document.createElement('div');
                lessionLeft.classList.add('lessionLeft');
                lession.appendChild(lessionLeft);

                const playButton = document.createElement('a');
                playButton.innerHTML = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16.25 18.5">
                        <title>playCourse</title>
                        <path id="Polygon_5" data-name="Polygon 5" d="M14.62,6.32a3.44,3.44,0,0,1,0,5.86L5.26,18A3.44,3.44,0,0,1,0,15.05V3.44A3.44,3.44,0,0,1,5.26.52Z" fill="currentColor"/>
                    </svg>`;
                lessionLeft.appendChild(playButton);

                const courseName = document.createElement('a');
                courseName.href = 'interactive.html';
                courseName.classList.add('courseName');
                courseName.innerText = course.title;
                lessionLeft.appendChild(courseName);

                const lessionRight = document.createElement('div');
                lessionRight.classList.add('lessionRight');
                lession.appendChild(lessionRight);

                const whatched = document.createElement('span');
                whatched.classList.add('whatched');
                whatched.innerHTML = '&#10003;';
                lessionRight.appendChild(whatched);

                courseName.addEventListener('click', e => {
                    localStorage.setItem('courseID', lession.getAttribute('data-ID'));
                })

                coursesTable.append(lession);
            }
        }).then(() => {
            const totalCoursesElements = document.querySelectorAll('.coursesTable div.lession');
            const doneCoursesElements = document.querySelectorAll('.coursesTable div.done');
            const progressBar = document.querySelector('.progress');
            const totalCourses = totalCoursesElements.length;
            const doneCourses = doneCoursesElements.length;
            progressBar.style.setProperty('--progress', `${(doneCourses/totalCourses) * 100}%`);
            removeLoader();
        });
    })
}
fetchingCourses();