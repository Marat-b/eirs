using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class TimeIntervalRepository: Repository<TimeInterval>, ITimeIntervalRepository
    {
        public TimeIntervalRepository(DbContext context) : base(context)
        {
        }
        
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        
    }
}