using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using StudentAdmissionManagementSystem.Model;

namespace StudentAdmissionManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdmissionController : ControllerBase
    {
        private static List<Admission> admissions = new List<Admission>();

        [HttpGet]
        public IActionResult GetAllAdmissions()
        {
            return Ok(admissions);
        }

        [HttpPost]
        public IActionResult Mark(Admission admission)
        {
            admissions.Add(admission);
            return Ok(admission);
        }

        [HttpGet("{id}")]
        public IActionResult GetAdmissionById(int id)
        {
            var admission = admissions.FirstOrDefault(a => a.Id == id);
            if (admission == null)
            {
                return NotFound();
            }
            return Ok(admission);
        }

    }
}