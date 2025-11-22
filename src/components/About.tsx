import PandaAnimation from "./PandaAnimation"

const About = () => {
  return (
    <>
    <PandaAnimation />
    <div className="about-page">
       <h1>About This App</h1>
      <p>
         This app is designed to help users learn the Swedish alphabet and Vowels
         in a fun and interactive way.
       </p>
       <p>
        Created by Farah Najib. Check out the source code on{' '}
        <a href="https://github.com/farah-najib/happy-learning">GitHub</a>.
       </p>
    </div>
    </>
  )
}

export default About
