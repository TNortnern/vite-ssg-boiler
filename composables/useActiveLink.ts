import { ref, computed } from 'vue'
import { navLinks } from '~/components/Navbar/state'
const activeLink = ref('')
export default function() {
  const getActiveLink = computed(() => navLinks.find(n => n.href === activeLink.value)?.href)
  return {
    getActiveLink,
    activeLink: activeLink.value,
    isActiveLink(href: string) {
      return getActiveLink.value === href
    },
    setActiveLink(href: string) {
      activeLink.value = href
    },
    navLinks,
  }
}
