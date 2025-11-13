import { useEffect } from 'react';
import { ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';

function App() {
  const posthog = usePostHog();

  useEffect(() => {
    posthog?.capture('page_view', {
      page: 'link_tree',
    });
  }, [posthog]);

  const handleLinkHover = (linkTitle: string) => {
    posthog?.capture('link_hover', {
      link_title: linkTitle,
      timestamp: new Date().toISOString(),
    });
  };

  const handleFooterLinkClick = () => {
    posthog?.capture('footer_link_clicked', {
      link_title: 'belavadi.com',
      location: 'footer',
    });
  };

  const links = [
    {
      title: 'Calendar',
      url: 'https://calendar.google.com/calendar/embed?src=6fd922f8157f4e4ac6ecdf9e6a2f211a72e1fc9220bf837b35aa3f13b3a278aa%40group.calendar.google.com&ctz=America%2FLos_Angeles',
      icon: ExternalLink,
      color: 'from-blue-400 to-cyan-400',
    },
    {
      title: 'List',
      url: 'https://docs.google.com/spreadsheets/d/1HKHjxP4mLvuZ3wuULRZ8VWLLM2w2Q2rRTIrVoKblpIg/edit?gid=0#gid=0',
      icon: Github,
      color: 'from-gray-700 to-gray-900',
    },
    {
      title: 'LinkedIn',
      url: 'https://linkedin.com/in/Prahaladbelavadi',
      icon: Linkedin,
      color: 'from-blue-600 to-blue-800',
    },
    {
      title: 'Contact Me',
      url: 'mailto:hello@belavadi.com',
      icon: Mail,
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-12 space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white">
              <span className="text-4xl font-bold text-white">B</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Tech Events in Bay Area
            </h1>
            
            <p className="text-gray-600 text-lg">Do not spend another hour on researching events </p>
              <p> See it in your calendar or all in one place</p>
          </div>

          <div className="space-y-4">
            {links.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full"
                  onClick={() => {
                    posthog?.capture('link_clicked', {
                      link_title: link.title,
                      link_url: link.url,
                      link_index: index,
                      timestamp: new Date().toISOString(),
                    });
                  }}
                  onMouseEnter={() => handleLinkHover(link.title)}
                >
                  <div className={`relative bg-gradient-to-r ${link.color} p-[2px] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
                    <div className="bg-white rounded-2xl px-8 py-5 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Icon className={`w-6 h-6 bg-gradient-to-r ${link.color} bg-clip-text text-transparent`} style={{ WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'currentColor' }} />
                        <span className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">
                          {link.title}
                        </span>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="py-8 text-center">
        <p className="text-gray-600">
          Made with{' '}
          <span className="text-red-500 animate-pulse inline-block">♥</span>{' '}
          •{' '}
          <a
            href="https://belavadi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-transparent bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text font-semibold hover:from-orange-700 hover:to-pink-700 transition-all"
            onClick={handleFooterLinkClick}
          >
            belavadi.com
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
