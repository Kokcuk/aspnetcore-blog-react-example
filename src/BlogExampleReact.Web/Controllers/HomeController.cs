using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlogExampleReact.Web.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogExampleReact.Web.Controllers
{
    public class HomeController: Controller
    {
        private readonly BlogExampleDbContext dbContext;

        public HomeController(BlogExampleDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        [Authorize(Roles = "admin")]
        public IActionResult RolePage()
        {
            return View();
        }
    }
}
