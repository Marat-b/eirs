using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using QuickApp.ViewModels;

namespace QuickApp.Controllers
{
    [Route("api/[controller]")]
    public class TimeintervalController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public TimeintervalController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        
        // GET
        [HttpGet("timeinterval")]
        public async Task<IActionResult> Get()
        {
            var allTimeIntervals =  _unitOfWork.TimeIntervals.GetAll().FirstOrDefault();
            if (allTimeIntervals==null)
                allTimeIntervals=new TimeInterval();
            return Ok(_mapper.Map<TimeIntervalViewModel>(allTimeIntervals));
        }
        
        [HttpPut("timeinterval")]
        public async Task<IActionResult> UpdateTimeInterval([FromBody] TimeIntervalViewModel entity)
        {
            if (ModelState.IsValid)
            {
                if (entity==null)
                    return BadRequest($"{nameof(entity)} cannot be found");
                
                var allTimeIntervals = _unitOfWork.TimeIntervals.GetAll().FirstOrDefault();
                if (allTimeIntervals == null)
                    return NotFound();
#if DEBUG
                // Debug.WriteLine("UpdateDevice entity.LastUpdate = " + entity.LastUpdate.ToString());
#endif

                _mapper.Map<TimeIntervalViewModel, TimeInterval>(entity, allTimeIntervals);
                _unitOfWork.TimeIntervals.Update(allTimeIntervals);
                _unitOfWork.SaveChanges();
                return NoContent();
            }

            return BadRequest(ModelState);
        }
    }
}