using Microsoft.EntityFrameworkCore;
using System.IO;

namespace locadora.Helpers
{
    public static class Mapper
    {
        public static T Map<T>(T target, T source, DbContext _context)
        {
            if (target is null || source is null) return target;

            var primaryKeyName = _context.Model.FindEntityType(typeof(T))?.FindPrimaryKey()?.Properties.Select(p => p.Name).Single();

            var type = source.GetType();
            var properties = type.GetProperties();
            foreach (var prop in properties)
            {
                var value = prop.GetValue(source, null);
                if(value is not null && prop.GetValue(target,null) != value && (primaryKeyName is null ? false : prop.Name != primaryKeyName ) && prop.GetSetMethod() is not null)
                {
                    prop.SetValue(target, value, null);
                }
            }

            return target;
        }
    }
}
