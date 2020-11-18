namespace QuickApp.ViewModels
{
    /// <summary>
    /// All devices for Link pool
    /// </summary>
    public class DeviceLPViewModel
    {
        public int Id { get; set; }
        /// <summary>
        /// Location of device
        /// </summary>
        public string CityAddress { get; set; }
        /// <summary>
        /// Name of device
        /// </summary>
        public string Name { get; set; }
    }
}