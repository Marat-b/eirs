using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using QuickApp.ViewModels;

namespace QuickApp.Controllers
{
    [Route("api/[controller]")]
    public class DeviceLinkpoolController: Controller
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public DeviceLinkpoolController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        
        [HttpGet("devicelinkpool/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            /*var device =  _unitOfWork.DeviceLinkpools.Get(id) ?? new DeviceLinkpool();
            return Ok(_mapper.Map<DeviceLinkpoolViewModel>(device));*/
            var devices = _unitOfWork.DeviceLinkpools.GetDevicesId(id);
            return Ok(devices);
        }

        [HttpPut("devicelinkpool/{id}")]
        public async Task<IActionResult> UpdateAll(int id, [FromBody] DeviceSelectedViewModel item)
        {
            //return Ok();
            if (ModelState.IsValid)
            {
                if (item == null)
                    return BadRequest($"{nameof(item)} cannot be found");
                // var devices = _mapper.Map<IEnumerable<DeviceLinkpool>>(item);
                var devices = item.DevicesId;
                #if DEBUG
                Debug.WriteLine("Task<IActionResult> UpdateAll item="+item.ToString());
                if (item.DevicesId==null)
                    Debug.WriteLine("item.DevicesId is null");
                else
                {
                    Debug.WriteLine("Task<IActionResult> UpdateAll devices=" + devices.ToString());
                    Debug.WriteLine("ask<IActionResult> UpdateAll device count=" + devices.Length.ToString());
                }
                
                #endif
                _unitOfWork.DeviceLinkpools.UpdateAll(id, item.DevicesId);
                return Ok();
            }

            return BadRequest((ModelState));
        }
        
        /*[HttpPost("devicelinkpool")]
        public async Task<IActionResult> NewDevice([FromBody] DeviceLinkpoolViewModel item)
        {
            if (ModelState.IsValid)
            {
                if (item == null)
                    return BadRequest($"{nameof(item)} cannot be found");

                var device = _mapper.Map<DeviceLinkpool>(item);
                _unitOfWork.DeviceLinkpools.Add(device);
                _unitOfWork.SaveChanges();

                var newItem = _unitOfWork.DeviceLinkpools.GetAll();
                return Ok(_mapper.Map<DeviceLinkpoolViewModel>(newItem));
            }

            return BadRequest(ModelState);
        }*/
        
        /*[HttpPut("devicelinkpool/{id}")]
        public async Task<IActionResult> UpdateDevice(int id, [FromBody] DeviceLinkpoolViewModel entity)
        {
            if (ModelState.IsValid)
            {
                if (entity==null)
                    return BadRequest($"{nameof(entity)} cannot be found");
                if (id!=entity.DeviceLinkpoolId)
                    return BadRequest("Conflicting device id in parameter");

                var device = _unitOfWork.DeviceLinkpools.Get(id);
                if (device == null)
                    return NotFound();
#if DEBUG
                Debug.WriteLine("UpdateDevice DeviceLinkpool = " /*+ entity.LastUpdate.ToString()#1#);
#endif

                _mapper.Map<DeviceLinkpoolViewModel, DeviceLinkpool>(entity, device);
                _unitOfWork.DeviceLinkpools.Update(device);
                _unitOfWork.SaveChanges();
                return NoContent();
            }

            return BadRequest(ModelState);
        }*/
        
    }
}