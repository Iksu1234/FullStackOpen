import Header from './Header'
import Content from './Content'

const Course = (course) => {
    
return(
    <>
    <Header course={course}></Header>
    <Content parts={course.course.parts}></Content>
    </>
)
}
export default Course