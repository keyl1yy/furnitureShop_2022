import React from 'react'
import { Link} from 'react-router-dom'
import imgAbout from '../../public/img/img_about.jpeg'
const About = () => {

    return (
        <>
            <section className='title-section'>
                <div className='section-center'>
                    <h3>
                        <a href='/'>Home</a> / about
                    </h3>
                </div>
            </section>
            <section className='page section section-center about-section'>
                <img src={imgAbout} alt='about-demo'/>
                <article>
                    <div className='title'>
                        <h2>our story</h2>
                        <div className='underline'/>
                    </div>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat accusantium sapiente tempora sed dolore esse deserunt eaque excepturi, delectus error accusamus vel eligendi, omnis beatae. Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque dolore, obcaecati incidunt sequi blanditiis est exercitationem molestiae delectus saepe odio eligendi modi porro eaque in libero minus unde sapiente consectetur architecto. Ullam rerum, nemo iste ex, eaque perspiciatis nisi, eum totam velit saepe sed quos similique amet. Ex, voluptate accusamus nesciunt totam vitae esse iste.</p>
                </article>
            </section>
        </>
    )
}

export default About
