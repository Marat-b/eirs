using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class LinkpoolRepository: Repository<Linkpool>, ILinkpoolRepository
    {
        public LinkpoolRepository(DbContext context) : base(context)
        {}
        
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}