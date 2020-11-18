using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using QuickApp.ViewModels;

namespace QuickApp.Controllers
{
    [Route("api/[controller]")]
    public class DeviceController : Controller
    {
        
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public DeviceController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
    
        [HttpGet("devices")]
        public async Task<IActionResult> Get()
        {
            var allDevices =  _unitOfWork.Devices.GetAll();
            if (allDevices==null)
                allDevices=new List<Device>().AsEnumerable();
            /*var result = new ObjectResult(_mapper.Map<IEnumerable<DeviceViewModel>>(allDevices))
            {
                StatusCode = (int)HttpStatusCode.OK
            };
            Response.Headers.Add("Content-Type","image/jpeg");
            return result;*/
            return Ok(_mapper.Map<IEnumerable<DeviceViewModel>>(allDevices));
        }

        [HttpGet("device/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var device =  _unitOfWork.Devices.Get(id) ?? new Device();
            return Ok(_mapper.Map<DeviceViewModel>(device));
        }

        [HttpPost("device")]
        public async Task<IActionResult> NewDevice([FromBody] DeviceViewModel item)
        {
            if (ModelState.IsValid)
            {
                if (item == null)
                    return BadRequest($"{nameof(item)} cannot be found");

                var device = _mapper.Map<Device>(item);
                _unitOfWork.Devices.Add(device);
                _unitOfWork.SaveChanges();

                var newItem = _unitOfWork.Devices.GetAll().OrderByDescending(o => o.Id).FirstOrDefault();
                return Ok(_mapper.Map<DeviceViewModel>(newItem));
            }

            return BadRequest(ModelState);
        }

        [HttpPut("device/{id}")]
        public async Task<IActionResult> UpdateDevice(int id, [FromBody] DeviceViewModel entity)
        {
            if (ModelState.IsValid)
            {
                if (entity==null)
                    return BadRequest($"{nameof(entity)} cannot be found");
                if (id!=entity.Id)
                    return BadRequest("Conflicting device id in parameter");

                var device = _unitOfWork.Devices.Get(id);
                if (device == null)
                    return NotFound();
                #if DEBUG
                Debug.WriteLine("UpdateDevice entity.LastUpdate = " + entity.LastUpdate.ToString());
                #endif

                _mapper.Map<DeviceViewModel, Device>(entity, device);
                _unitOfWork.Devices.Update(device);
                _unitOfWork.SaveChanges();
                return NoContent();
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("device/{id}")]
        public async Task<IActionResult> DeleteDevice(int id)
        {
            var device = _unitOfWork.Devices.Get(id);
            if (device == null)
                return NotFound();
            _unitOfWork.Devices.Remove(device);
            _unitOfWork.SaveChanges();
            return NoContent();
        }

        /*[HttpGet("deviceslp")]
        public async Task<IActionResult> GetLP()
        {
            var devices = _unitOfWork.Devices.GetAll4LP() ?? new List<Device>().AsEnumerable();
            return Ok(_mapper.Map<IEnumerable<DeviceLPViewModel>>(devices));
        }*/

        [HttpGet("deviceslp/{id}")]
        public async Task<IActionResult> GetLP(int id)
        {
            var devices = _unitOfWork.Devices.Get4CurrentLP(id) ?? new List<Device>().AsEnumerable();
            return Ok(_mapper.Map<IEnumerable<DeviceLPViewModel>>(devices));

        }
        
    }
}