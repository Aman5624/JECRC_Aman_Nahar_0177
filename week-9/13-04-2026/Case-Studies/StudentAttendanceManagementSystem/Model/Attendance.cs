namespace StudentAttendanceManagementSystem.Model
{
    public class Attendance
    {
        public int Id { get; set; }
        public string StudentName { get; set; }
        public DateTime Date { get; set; }
        public bool IsPresent { get; set; }
    }
}