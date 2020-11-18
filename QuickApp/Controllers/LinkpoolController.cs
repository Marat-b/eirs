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
    public class LinkpoolController: Controller
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        
        public LinkpoolController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        
        [HttpGet("linkpools")]
        public async Task<IActionResult> Get()
        {
            var allLinkpools = _unitOfWork.Linkpools.GetAll();
            if (allLinkpools == null)
            {
                allLinkpools=new List<Linkpool>().AsEnumerable();
            }

            return Ok(_mapper.Map<IEnumerable<LinkpoolViewModel>>(allLinkpools));
        }

        [HttpGet("linkpool/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var linkpool = _unitOfWork.Linkpools.Get(id) ?? new Linkpool();
            return Ok(_mapper.Map<LinkpoolViewModel>(linkpool));
        }

        [HttpPost("linkpool")]
        public async Task<IActionResult> NewLinkpool([FromBody] LinkpoolViewModel item)
        {
            if (ModelState.IsValid)
            {
                if (item == null)
                    return BadRequest($"{nameof(item)} cannot be found");
                var linkpool = _mapper.Map<Linkpool>(item);
                _unitOfWork.Linkpools.Add(linkpool);
                _unitOfWork.SaveChanges();
                
                var newItem = _unitOfWork.Linkpools.GetAll().OrderByDescending(o => o.LinkpoolId).FirstOrDefault();
                return Ok(_mapper.Map<LinkpoolViewModel>(newItem));

            }
            return BadRequest(ModelState);
        }
        
        [HttpPut("linkpool/{id}")]
        public async Task<IActionResult> UpdateLinkpool(int id, [FromBody] LinkpoolViewModel entity)
        {
            if (ModelState.IsValid)
            {
                if (entity==null)
                    return BadRequest($"{nameof(entity)} cannot be found");
                if (id!=entity.LinkpoolId)
                    return BadRequest("Conflicting device id in parameter");

                var device = _unitOfWork.Linkpools.Get(id);
                if (device == null)
                    return NotFound();
#if DEBUG
                Debug.WriteLine("UpdateDevice entity.LastUpdate = " + entity.LinkPath.ToString());
#endif

                _mapper.Map<LinkpoolViewModel, Linkpool>(entity, device);
                _unitOfWork.Linkpools.Update(device);
                _unitOfWork.SaveChanges();
                return NoContent();
            }

            return BadRequest(ModelState);
        }
        
        [HttpDelete("linkpool/{id}")]
        public async Task<IActionResult> DeleteLinkpool(int id)
        {
            var device = _unitOfWork.Linkpools.Get(id);
            if (device == null)
                return NotFound();
            _unitOfWork.Linkpools.Remove(device);
            _unitOfWork.SaveChanges();
            return NoContent();
        }
    }
}