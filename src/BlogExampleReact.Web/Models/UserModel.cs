using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogExampleReact.Web.Models
{
    public class UserModel
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public long[] SelectedRoles { get; set; }
    }
}
