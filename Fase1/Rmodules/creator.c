#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/proc_fs.h>  
#include <linux/seq_file.h>  
#include <linux/mm.h>  
#include <linux/sched.h>  
#include <linux/timer.h>  
#include <linux/jiffies.h>  


MODULE_LICENSE("GPL");
MODULE_AUTHOR("s3r");
MODULE_DESCRIPTION("Modulo para leer informacion de memoria");
MODULE_VERSION("1.0");

#define PROC_NAME "ram_202010298"  


static int sysinfo_show(struct seq_file *m, void *v) {
    struct sysinfo si;  

    si_meminfo(&si);  

   
    seq_printf(m, "{\n");
    seq_printf(m, "\"RAM_Total\": %lu, \n", si.totalram * 4);
    seq_printf(m, "\"RAM_Libre\": %lu, \n", si.freeram * 4);
    seq_printf(m, "\"RAM_EnUso\": %lu, \n", (si.totalram - si.freeram) * 4);
    seq_printf(m, "\"Porcentaje\": %lu \n", ((si.totalram - si.freeram)*100/ si.totalram));
    seq_printf(m, "}");
    return 0;
};


static int sysinfo_open(struct inode *inode, struct file *file) {
    return single_open(file, sysinfo_show, NULL);
}



static const struct proc_ops sysinfo_ops = {
    .proc_open = sysinfo_open,
    .proc_read = seq_read,
};


static int __init sysinfo_init(void) {
    proc_create(PROC_NAME, 0, NULL, &sysinfo_ops);
    printk(KERN_INFO "sysinfo module loaded\n");
    return 0;
}


static void __exit sysinfo_exit(void) {
    remove_proc_entry(PROC_NAME, NULL);
    printk(KERN_INFO "sysinfo module unloaded\n");
}

module_init(sysinfo_init);
module_exit(sysinfo_exit);