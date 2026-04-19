using Microsoft.AspNetCore.Mvc;
using StudentAttendanceManagementSystem.Model;

namespace StudentAttendanceManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private static List<Attendance> attendanceRecords = new List<Attendance>();

        [HttpGet]
        public IActionResult Get() => Ok(attendanceRecords);

        [HttpPost]
        public IActionResult MarkAttendance(Attendance attendance)
        {
            attendanceRecords.Add(attendance);
            return Ok(attendanceRecords);
        }
    }
}