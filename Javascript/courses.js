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
                
                const bookmark = document.createElement('span');
                bookmark.classList.add('bookmark');
                bookmark.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14 18">
                        <path id="unfilled" data-name="Path 1456" d="M17,3H7A2.006,2.006,0,0,0,5,5V21l7-3,7,3V5A2.006,2.006,0,0,0,17,3Zm0,15-5-2.18L7,18V6A1,1,0,0,1,8,5h8a1,1,0,0,1,1,1Z" transform="translate(-5 -3)" fill="currentColor"/>
                        <path id="filled" data-name="Path 1456" d="M17,3H7A2.006,2.006,0,0,0,5,5V21l7-3,7,3V5A2.006,2.006,0,0,0,17,3Z" transform="translate(-5 -3)" fill="currentColor"/>
                    </svg>`;
                lessionRight.appendChild(bookmark);

                const duration = document.createElement('span');
                duration.innerText = '1m 49s';
                lessionRight.appendChild(duration);

                const lessionDetails = document.createElement('span');
                lessionDetails.classList.add('lessionDetails');
                lessionDetails.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 7 4.125">
                        <path id="keyboard_arrow_down-24px" d="M7.48,9.181l2.43,2.43,2.43-2.43a.625.625,0,1,1,.883.883l-2.875,2.875a.624.624,0,0,1-.883,0L6.591,10.064a.624.624,0,0,1,0-.883A.637.637,0,0,1,7.48,9.181Z" transform="translate(-6.407 -8.997)" fill="currentColor"/>
                    </svg>`;
                lessionRight.appendChild(lessionDetails);

                courseName.addEventListener('click', e => {
                    localStorage.setItem('courseID', lession.getAttribute('data-ID'));
                })

                coursesTable.append(lession);
            }

            const bookmarks = document.querySelectorAll('.bookmark svg');

            bookmarks.forEach(bookmark => {
                bookmark.parentElement.addEventListener('click', e => {
                    e.preventDefault()
                    bookmark.classList.toggle('active');
                })
            })
            removeLoader();
        });
    })
}
fetchingCourses();