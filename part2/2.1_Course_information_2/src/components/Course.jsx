import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (course) => {

return(
    <>
    <Header course={course}></Header>
    <Content parts={course.course.parts}></Content>
    <Total parts={course.course.parts}></Total>
    </>
)
}
export default Course