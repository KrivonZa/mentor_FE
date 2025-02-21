import React, { useContext, useEffect } from 'react'
import "../../public/css/CourseDetailSchedule.scss";
import { CourseDetailContext } from '../modules/mainPage/CourseDetail';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Empty } from 'antd';

export const CourseDetailSchedule1 = () => {
    return (
        <div id="tabs" className="tabs p-5">
            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="col-lg-12 mb-5">
                    <div id="webcrumbs" className='d-flex justify-content-center align-items-center'>
                        <div className="w-[1024px] bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-2xl font-bold">Weekly Schedule</h1>
                                <div className="flex space-x-4">
                                    <button className="px-4 py-2 bg-[#5fd080] text-white rounded-lg hover:bg-[#4db068] transform hover:scale-105 transition-all duration-300">
                                        <span className="material-symbols-outlined">add</span>
                                    </button>
                                    <button className="px-4 py-2 bg-[#5fd080] text-white rounded-lg hover:bg-[#4db068] transform hover:scale-105 transition-all duration-300">
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-8 gap-4">
                                <div className="col-span-1"></div>
                                <div className="col-span-1 text-center font-semibold">Monday</div>
                                <div className="col-span-1 text-center font-semibold">Tuesday</div>
                                <div className="col-span-1 text-center font-semibold">Wednesday</div>
                                <div className="col-span-1 text-center font-semibold">Thursday</div>
                                <div className="col-span-1 text-center font-semibold">Friday</div>
                                <div className="col-span-1 text-center font-semibold">Saturday</div>
                                <div className="col-span-1 text-center font-semibold">Sunday</div>

                                {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => (
                                    <>
                                        <div className="text-right pr-2">{`${hour}:00`}</div>
                                        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                                            <div className="relative bg-gray-50 border border-gray-200 rounded-lg p-2 min-h-[80px] hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02]">
                                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                                    <span className="material-symbols-outlined text-4xl text-gray-300">
                                                        event_note
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ))}
                            </div>

                            <div className="mt-6 flex justify-end space-x-4">
                                <button className="px-6 py-2.5 bg-[#5fd080] text-white rounded-lg hover:bg-[#4db068] transition-all duration-300 transform hover:scale-105">
                                    Save Schedule
                                </button>
                                <button className="px-6 py-2.5 border-2 border-[#5fd080] rounded-lg hover:bg-[#5fd080] hover:text-white transition-all duration-300 transform hover:scale-105">
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-lg-12 mt-4 mt-lg-0">
                        <div className="tab-content">
                            <div className="tab-pane active show" id="tab-1">
                                <div className="row">
                                    <div className="col-lg-8 details order-2 order-lg-1">
                                        <h3>Architecto ut aperiam autem id</h3>
                                        <p className="fst-italic">
                                            Qui laudantium consequatur laborum sit qui ad sapiente
                                            dila parde sonata raqer a videna mareta paulona marka
                                        </p>
                                        <p>
                                            Et nobis maiores eius. Voluptatibus ut enim blanditiis
                                            atque harum sint. Laborum eos ipsum ipsa odit magni.
                                            Incidunt hic ut molestiae aut qui. Est repellat minima
                                            eveniet eius et quis magni nihil. Consequatur dolorem
                                            quaerat quos qui similique accusamus nostrum rem vero
                                        </p>
                                    </div>
                                    <div className="col-lg-4 text-center order-1 order-lg-2">
                                        <img src="/img/tabs/tab-1.png" alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane" id="tab-2">
                                <div className="row">
                                    <div className="col-lg-8 details order-2 order-lg-1">
                                        <h3>Et blanditiis nemo veritatis excepturi</h3>
                                        <p className="fst-italic">
                                            Qui laudantium consequatur laborum sit qui ad sapiente
                                            dila parde sonata raqer a videna mareta paulona marka
                                        </p>
                                        <p>
                                            Ea ipsum voluptatem consequatur quis est. Illum error
                                            ullam omnis quia et reiciendis sunt sunt est. Non
                                            aliquid repellendus itaque accusamus eius et velit ipsa
                                            voluptates. Optio nesciunt eaque beatae accusamus lerode
                                            pakto madirna desera vafle de nideran pal
                                        </p>
                                    </div>
                                    <div className="col-lg-4 text-center order-1 order-lg-2">
                                        <img src="/img/tabs/tab-2.png" alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane" id="tab-3">
                                <div className="row">
                                    <div className="col-lg-8 details order-2 order-lg-1">
                                        <h3>Impedit facilis occaecati odio neque aperiam sit</h3>
                                        <p className="fst-italic">
                                            Eos voluptatibus quo. Odio similique illum id quidem non
                                            enim fuga. Qui natus non sunt dicta dolor et. In
                                            asperiores velit quaerat perferendis aut
                                        </p>
                                        <p>
                                            Iure officiis odit rerum. Harum sequi eum illum corrupti
                                            culpa veritatis quisquam. Neque necessitatibus illo
                                            rerum eum ut. Commodi ipsam minima molestiae sed
                                            laboriosam a iste odio. Earum odit nesciunt fugiat sit
                                            ullam. Soluta et harum voluptatem optio quae
                                        </p>
                                    </div>
                                    <div className="col-lg-4 text-center order-1 order-lg-2">
                                        <img src="/img/tabs/tab-3.png" alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane" id="tab-4">
                                <div className="row">
                                    <div className="col-lg-8 details order-2 order-lg-1">
                                        <h3>
                                            Fuga dolores inventore laboriosam ut est accusamus
                                            laboriosam dolore
                                        </h3>
                                        <p className="fst-italic">
                                            Totam aperiam accusamus. Repellat consequuntur iure
                                            voluptas iure porro quis delectus
                                        </p>
                                        <p>
                                            Eaque consequuntur consequuntur libero expedita in
                                            voluptas. Nostrum ipsam necessitatibus aliquam fugiat
                                            debitis quis velit. Eum ex maxime error in consequatur
                                            corporis atque. Eligendi asperiores sed qui veritatis
                                            aperiam quia a laborum inventore
                                        </p>
                                    </div>
                                    <div className="col-lg-4 text-center order-1 order-lg-2">
                                        <img
                                            src="a/img/tabs/tab-4.png"
                                            alt=""
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane" id="tab-5">
                                <div className="row">
                                    <div className="col-lg-8 details order-2 order-lg-1">
                                        <h3>
                                            Est eveniet ipsam sindera pad rone matrelat sando reda
                                        </h3>
                                        <p className="fst-italic">
                                            Omnis blanditiis saepe eos autem qui sunt debitis porro
                                            quia.
                                        </p>
                                        <p>
                                            Exercitationem nostrum omnis. Ut reiciendis repudiandae
                                            minus. Omnis recusandae ut non quam ut quod eius qui.
                                            Ipsum quia odit vero atque qui quibusdam amet. Occaecati
                                            sed est sint aut vitae molestiae voluptate vel
                                        </p>
                                    </div>
                                    <div className="col-lg-4 text-center order-1 order-lg-2">
                                        <img src="/img/tabs/tab-5.png" alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const CourseDetailSchedule = () => {
    const { courseDetail, isLoading } = useContext(CourseDetailContext);

    useEffect(() => {
        console.log('adasd: ', courseDetail);
        
    }, [courseDetail])

    return (
        <section id="tabs" className="tabs section">
            <div className="container" data-aos="fade-up" data-aos-delay={100}>
                <div className="row">
                    <div className="col-lg-3">
                        <ul className="nav nav-tabs flex-column">
                            {courseDetail?.lesson?.map((item, index) => (
                                <li key={item.lessonID} className="nav-item">
                                    <a
                                        className={`nav-link ${index === 0 ? "active" : ""}`}
                                        data-bs-toggle="tab"
                                        href={`#tab-${item.lessonID}`}
                                    >
                                        {item.description}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-lg-9 mt-4 mt-lg-0">
                        <div className="tab-content">
                            {courseDetail?.lesson?.map((item, index) => (
                                <div
                                    key={item.lessonID}
                                    className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                                    style={{gap:20}}
                                    id={`tab-${item.lessonID}`}
                                >

                                    {item.schedule.length === 0 && (
                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                    )}
                                    {item.schedule.map((schedule) => {
                                        const startDate = new Date(schedule.startTime);
                                        const endDate = new Date(schedule.endTime);

                                        const formattedStartTime = `${startDate.getHours()}:${String(startDate.getMinutes()).padStart(2, "0")} ${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
                                        const formattedEndTime = `${endDate.getHours()}:${String(endDate.getMinutes()).padStart(2, "0")} ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;

                                        return (
                                            <p key={schedule.scheduleID} className="badge bg-success px-3 py-2 rounded-pill fs-5 me-2">
                                                {formattedStartTime} - {formattedEndTime}
                                            </p>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CourseDetailSchedule