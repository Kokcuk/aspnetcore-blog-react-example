using System;

namespace BlogExampleReact.Web.Models
{
    public class PostModel
    {
        public long Id { get; set; }
        public DateTime CreateDate { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
    }
}